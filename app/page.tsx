"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useProfileFetchQuery } from "./hooks/useProfileFetchQuery";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const validateLinkedInUrl = (url: string) => {
    const linkedInUrlPattern = /linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedInUrlPattern.test(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    setIsValidUrl(value === "" || validateLinkedInUrl(value));
  };

  const { data, error, isLoading } = useProfileFetchQuery(username);

  const handleFetch = () => {
    const trimmedInput = inputValue.trim();
    if (!validateLinkedInUrl(trimmedInput)) {
      setIsValidUrl(false);
      return;
    }

    const match = trimmedInput.match(/\/in\/([a-zA-Z0-9-]+)/);
    const extractedUsername = match ? match[1] : '';
    setUsername(extractedUsername);
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="h-[60px] flex items-center justify-center w-full max-w-sm">
            {error && (
              <div className="text-red-500 text-center p-3 bg-red-50 rounded-lg w-full">
                {error.message}
              </div>
            )}
          </div>

          <div className="relative w-[200px] h-[200px] overflow-hidden rounded-full shadow-lg">
            {data?.profilePicUrl || error ? (
              <Image
                src={data?.profilePicUrl || "/blank_avatar.png"}
                alt="LinkedIn Profile Picture"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full ${isLoading ? 'bg-gray-200 animate-pulse' : 'bg-gray-100'}`} />
            )}
          </div>
        </div>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Enter a LinkedIn username like {" "}
            <span className="font-light bg-black/[.05] px-1 py-0.5 rounded">https://www.linkedin.com/in/
              <code className="font-mono font-semibold px-1 py-0.5 rounded">
                williamhgates
              </code>
            </span>
          </li>
          <li className="tracking-[-.01em]">
            Click Fetch Profile Image.
          </li>
        </ol>

        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="https://www.linkedin.com/in/williamhgates"
              value={inputValue}
              onChange={handleInputChange}
              className={`flex-[2] ${!isValidUrl ? "border-red-500" : ""}`}
            />
            <Button
              type="submit"
              className="cursor flex-1"
              onClick={handleFetch}
              disabled={!isValidUrl || inputValue === "" || isLoading}
            >
              {isLoading ? "Loading..." : "Fetch Profile Image"}
            </Button>
          </div>
          {!isValidUrl && (
            <p className="text-sm text-red-500">
              Please enter a valid LinkedIn profile URL
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
