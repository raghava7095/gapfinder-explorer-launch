
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <motion.div 
      className="max-w-4xl w-full text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <Lightbulb className="h-16 w-16 mx-auto text-gapfinder-500 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gapfinder-600 to-accent bg-clip-text text-transparent">
          Welcome to GapFinder
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover the knowledge gaps in any topic and accelerate your learning journey.
        </p>
      </div>

      <div className="grid gap-6 max-w-lg mx-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="w-full py-6 text-lg rounded-xl flex items-center justify-center gap-2 bg-gapfinder-600 hover:bg-gapfinder-700"
          >
            <Link to="/topic-input" className="flex items-center justify-center w-full">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
