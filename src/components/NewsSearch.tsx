
import { useState } from "react";
import { Search, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import { fetchTopHeadlines, searchNews, type NewsArticle } from "@/services/newsService";

interface NewsSearchProps {
  onSelectArticle: (article: NewsArticle) => void;
}

const NewsSearch: React.FC<NewsSearchProps> = ({ onSelectArticle }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("trending");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const response = await searchNews(searchQuery);
      setArticles(response.articles);
    } catch (error) {
      toast({
        title: "Error searching news",
        description: "Could not fetch news articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const loadTrendingNews = async (category?: string) => {
    setLoading(true);
    try {
      const response = await fetchTopHeadlines("us", category);
      setArticles(response.articles);
    } catch (error) {
      toast({
        title: "Error loading trending news",
        description: "Could not fetch news articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (value === "trending") {
      loadTrendingNews();
    } else if (value !== "search") {
      loadTrendingNews(value);
    }
  };
  
  const handleSelectArticle = (article: NewsArticle) => {
    onSelectArticle(article);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex justify-start">
          <Newspaper className="mr-2 h-4 w-4" />
          Import from News API
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] min-h-[500px]">
        <DialogHeader>
          <DialogTitle>Browse News Articles</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="trending" value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="mb-4 w-full justify-start overflow-auto">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="politics">Politics</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            {currentTab === "search" && (
              <div className="flex gap-2">
                <Input 
                  placeholder="Search news articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
                <Button onClick={handleSearch} disabled={loading}>
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </Button>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <p>Loading articles...</p>
              </div>
            ) : articles.length > 0 ? (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {articles.map((article, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleSelectArticle(article)}
                  >
                    <CardContent className="p-4 flex gap-4">
                      {article.urlToImage && (
                        <div className="h-24 w-24 flex-shrink-0">
                          <img 
                            src={article.urlToImage} 
                            alt={article.title}
                            className="h-full w-full object-cover rounded-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/96x96?text=News";
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h4 className="font-bold line-clamp-2">{article.title}</h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm line-clamp-2">{article.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center min-h-[300px]">
                <p className="text-muted-foreground">
                  {currentTab === "search" 
                    ? "Search for news articles above" 
                    : "No articles found. Try a different category."}
                </p>
              </div>
            )}
            
            {articles.length > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsSearch;
