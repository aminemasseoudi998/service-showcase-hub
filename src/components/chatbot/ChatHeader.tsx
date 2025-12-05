import { Bot, X, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border/50 gradient-accent rounded-t-2xl">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm">
          <Bot className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-outfit font-semibold text-accent-foreground">
            TechVision AI
          </h3>
          <p className="text-xs text-accent-foreground/70">
            Always here to help
          </p>
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-accent-foreground hover:bg-background/20"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-accent-foreground hover:bg-background/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
