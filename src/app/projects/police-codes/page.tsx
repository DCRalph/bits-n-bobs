"use client";

import { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import { Search, X, ArrowUp } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

export default function PoliceCodesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const allCodesQuery = api.policeCodes.getAll.useQuery();
  const searchCodesQuery = api.policeCodes.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.trim().length > 0 }
  );

  const codesData = searchQuery.trim()
    ? searchCodesQuery.data
    : allCodesQuery.data;

  const sections = useMemo(
    () => (codesData ? Object.keys(codesData) : []),
    [codesData]
  );

  const totalCodes = useMemo(() => {
    if (!codesData) return 0;
    return Object.values(codesData).reduce(
      (acc, codes) => acc + codes.length,
      0
    );
  }, [codesData]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-2xl px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Police Codes</h1>
            <Badge variant="secondary" className="text-xs">
              {totalCodes} codes
            </Badge>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search codes or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-2xl px-4 py-4">
        {/* Loading State */}
        {allCodesQuery.isLoading && (
          <div className="py-12 text-center text-muted-foreground">
            Loading codes...
          </div>
        )}

        {/* No Results */}
        {!allCodesQuery.isLoading && sections.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No codes found.
          </div>
        )}

        {/* Sections */}
        <div className="space-y-6">
          {codesData &&
            sections.map((section) => {
              const codes = codesData[section] ?? [];

              return (
                <section key={section}>
                  {/* Section Header */}
                  <div className="mb-2 flex items-center gap-2 border-b pb-2">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {section}
                    </h2>
                    <Badge variant="outline" className="text-xs">
                      {codes.length}
                    </Badge>
                  </div>

                  {/* Codes List */}
                  <div className="divide-y rounded-lg border">
                    {codes.map((codeItem, index) => (
                      <div
                        key={`${section}-${index}-${codeItem.CODE}`}
                        className="flex"
                      >
                        <div className="flex w-20 shrink-0 items-center justify-center bg-muted/30 px-2 py-2.5 sm:w-24">
                          <code className="text-sm font-semibold">
                            {codeItem.CODE}
                          </code>
                        </div>
                        <div className="flex-1 px-3 py-2.5">
                          <span className="text-sm">
                            {codeItem.DESCRIPTION}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
        </div>

        {/* Spacer for FAB */}
        <div className="h-16" />
      </main>

      {/* Back to Top FAB */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
