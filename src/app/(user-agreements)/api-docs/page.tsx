"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const BASE_URL = "https://nativeig.vercel.app";

const errorExample = `{
  "status": "error",
  "message": "Post URL is required"
}`;

const successExample = `{
  "status": "success",
  "data": {
    "filename": "native-ig-1734345296.mp4",
    "width": "640",
    "height": "1136",
    "videoUrl": "https://scontent-iad3-2.cdninstagram.com/..."
  }
}`;

const endpointExample = `// Using fetch
const response = await fetch('${BASE_URL}/api/video?postUrl=INSTAGRAM_POST_URL');
const data = await response.json();

// Using axios
const response = await axios.get('${BASE_URL}/api/video', {
  params: { postUrl: 'INSTAGRAM_POST_URL' }
});`;

const codeExamples = {
  fetch: `// Using Fetch API
const getVideoInfo = async (postUrl) => {
  try {
    const response = await fetch(\`${BASE_URL}/api/video?postUrl=\${encodeURIComponent(postUrl)}\`);
    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

// Usage
const videoInfo = await getVideoInfo('https://www.instagram.com/reel/xyz123/');
console.log(videoInfo);`,

  axiosTs: `// Using Axios with TypeScript
import axios from 'axios';

interface VideoInfo {
  filename: string;
  width: string;
  height: string;
  videoUrl: string;
}

interface ApiResponse {
  status: 'success' | 'error';
  data?: VideoInfo;
  message?: string;
}

const getVideoInfo = async (postUrl: string): Promise<VideoInfo> => {
  try {
    const { data } = await axios.get<ApiResponse>(\`${BASE_URL}/api/video\`, {
      params: { postUrl },
      validateStatus: (status) => status === 200,
    });
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }
    
    return data.data!;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

// Usage
const videoInfo = await getVideoInfo('https://www.instagram.com/reel/xyz123/');
console.log(videoInfo);`,

  axiosJs: `// Using Axios with JavaScript
const axios = require('axios');
// or import axios from 'axios';

const getVideoInfo = async (postUrl) => {
  try {
    const { data } = await axios.get(\`${BASE_URL}/api/video\`, {
      params: { postUrl },
      validateStatus: (status) => status === 200,
    });
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

// Usage
const videoInfo = await getVideoInfo('https://www.instagram.com/reel/xyz123/');
console.log(videoInfo);`,

  python: `# Using Python with requests
import requests
from urllib.parse import quote

def get_video_info(post_url: str) -> dict:
    try:
        encoded_url = quote(post_url)
        response = requests.get(
            f"${BASE_URL}/api/video",
            params={"postUrl": post_url},
            timeout=30
        )
        response.raise_for_status()
        
        data = response.json()
        if data["status"] == "error":
            raise Exception(data["message"])
            
        return data["data"]
    except Exception as e:
        print(f"Error fetching video: {str(e)}")
        raise

# Usage
video_info = get_video_info("https://www.instagram.com/reel/xyz123/")
print(video_info)`,

  curl: `curl -X GET "${BASE_URL}/api/video?postUrl=https%3A%2F%2Fwww.instagram.com%2Freel%2Fxyz123%2F" \\
  -H "Accept: application/json"`,
};

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute right-4 top-4 z-20 rounded-md p-2 transition-all",
          "bg-muted/80 hover:bg-muted",
          "text-muted-foreground hover:text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primary"
        )}
        title="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          fontSize: "inherit",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const ApiDocsPage = () => {
  return (
    <div className="container mx-auto py-4 px-3 sm:py-8 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent">
            API Documentation
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-2">
            Learn how to integrate Native IG&apos;s video download functionality into your applications
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8">
          {/* Endpoint Section */}
          <Card className="overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-xl sm:text-2xl">Video Download Endpoint</CardTitle>
                <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1">GET</Badge>
              </div>
              <CardDescription className="text-sm sm:text-base mt-2">
                Retrieve video information and download URL from an Instagram post
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="rounded-md bg-muted p-3 sm:p-4 overflow-x-auto">
                <code className="text-xs sm:text-sm whitespace-nowrap">
                  GET {BASE_URL}/api/video?postUrl=INSTAGRAM_POST_URL
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Parameters Section */}
          <Card className="overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">Request Parameters</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                Required query parameters for the API
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left text-xs sm:text-sm font-medium">Parameter</th>
                      <th className="py-2 px-4 text-left text-xs sm:text-sm font-medium">Type</th>
                      <th className="py-2 px-4 text-left text-xs sm:text-sm font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b last:border-0">
                      <td className="py-2 px-4 text-xs sm:text-sm">
                        <code className="rounded bg-muted px-1.5 py-0.5">postUrl</code>
                      </td>
                      <td className="py-2 px-4 text-xs sm:text-sm">string</td>
                      <td className="py-2 px-4 text-xs sm:text-sm">
                        The URL of the Instagram Reel to download (e.g., https://www.instagram.com/reels/xyz123/)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Response Examples */}
          <Card className="overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">Response Examples</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                Example responses from the API
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Tabs defaultValue="success" className="w-full">
                <div className="overflow-x-auto pb-2">
                  <TabsList className="mb-3 sm:mb-4 inline-flex min-w-full sm:w-auto">
                    <TabsTrigger value="success" className="min-w-[140px] whitespace-nowrap">Success Response</TabsTrigger>
                    <TabsTrigger value="error" className="min-w-[140px] whitespace-nowrap">Error Response</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="success">
                  <div className="text-xs sm:text-sm">
                    <CodeBlock code={successExample} language="json" />
                  </div>
                </TabsContent>
                <TabsContent value="error">
                  <div className="text-xs sm:text-sm">
                    <CodeBlock code={errorExample} language="json" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card className="overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">Code Examples</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                Example code snippets for API integration in different languages
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <Tabs defaultValue="fetch" className="w-full">
                <div className="overflow-x-auto pb-2">
                  <TabsList className="mb-3 sm:mb-4 inline-flex min-w-full sm:w-auto">
                    <TabsTrigger value="fetch" className="min-w-[100px] whitespace-nowrap">Fetch API</TabsTrigger>
                    <TabsTrigger value="axiosTs" className="min-w-[100px] whitespace-nowrap">Axios + TS</TabsTrigger>
                    <TabsTrigger value="axiosJs" className="min-w-[100px] whitespace-nowrap">Axios JS</TabsTrigger>
                    <TabsTrigger value="python" className="min-w-[100px] whitespace-nowrap">Python</TabsTrigger>
                    <TabsTrigger value="curl" className="min-w-[100px] whitespace-nowrap">cURL</TabsTrigger>
                  </TabsList>
                </div>
                {Object.entries(codeExamples).map(([key, code]) => (
                  <TabsContent key={key} value={key}>
                    <div className="text-xs sm:text-sm">
                      <CodeBlock
                        code={code}
                        language={key === 'curl' ? 'bash' : key === 'python' ? 'python' : 'typescript'}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card className="overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">Important Notes</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                Things to keep in mind when using the API
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <ul className="list-disc space-y-2 pl-5 text-xs sm:text-sm text-muted-foreground">
                <li>Only Instagram Reels are supported (URLs starting with instagram.com/reels/)</li>
                <li>Ensure the Instagram Reel URL is publicly accessible</li>
                <li>The API returns direct video URLs that are valid for a limited time</li>
                <li>Rate limiting may apply to prevent abuse</li>
                <li>Video quality is the highest available from the source</li>
                <li>For support or questions, please visit our <a href="https://github.com/code3-dev/native-ig" className="text-primary hover:underline">GitHub repository</a></li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
        </div>
    );
};

export default ApiDocsPage;
