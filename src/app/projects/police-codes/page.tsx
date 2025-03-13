"use client";

import { useState, useEffect, useMemo } from "react";
import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

// Helper to generate a safe ID for each section.
const getSectionId = (section: string) =>
  section.replace(/\s+/g, "-").toLowerCase();

// Compute a dynamic threshold for an element based on its height relative to the window.
// If the element is shorter than 50% of the window, use 50%; if it's taller, then adjust.
const computeDynamicThreshold = (el: HTMLElement) => {
  const defaultThreshold = 0.5;
  const elHeight = el.getBoundingClientRect().height;
  if (elHeight > window.innerHeight * defaultThreshold) {
    // For a tall element, reduce the threshold proportionally.
    return (
      ((window.innerHeight * defaultThreshold) / elHeight) * defaultThreshold
    );
  }
  return defaultThreshold;
};

export default function PoliceCodesPage() {
  // We keep searchQuery state but leave it empty (since we're not using an input box now).
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSections, setActiveSections] = useState<string[]>([]);

  // Use the getAll endpoint for full data.
  const allCodesQuery = api.policeCodes.getAll.useQuery();
  // The search endpoint is still wired up but will never run because searchQuery is always empty.
  const searchCodesQuery = api.policeCodes.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.trim().length > 0 },
  );

  // If a search term is entered, use the search results; otherwise, use the full data.
  // (Since searchQuery is empty, codesData always comes from allCodesQuery.)
  const codesData = searchQuery.trim()
    ? searchCodesQuery.data
    : allCodesQuery.data;

  // Derive sections from the rendered data.
  const sections = useMemo(
    () => (codesData ? Object.keys(codesData) : []),
    [codesData],
  );

  // Default active section if none are set.
  useEffect(() => {
    if (codesData && sections.length > 0 && activeSections.length === 0) {
      if (sections[0]) {
        setActiveSections([sections[0]]);
      }
    }
  }, [codesData, sections, activeSections]);

  // For each section element, create its own IntersectionObserver with a dynamic threshold.
  useEffect(() => {
    const visibilityMap: Record<string, boolean> = {};
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(getSectionId(section));
      if (!el) return;
      const dynamicThreshold = computeDynamicThreshold(el);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Mark the section as visible if its intersection ratio exceeds its threshold.
            visibilityMap[section] =
              entry.intersectionRatio >= dynamicThreshold;
          });
          // Use the original order from sections.
          const visibleSections = sections.filter((s) => visibilityMap[s]);
          setActiveSections(visibleSections);
        },
        { threshold: dynamicThreshold },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  // Scroll back to the top.
  const scrollBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // When a sidebar section is clicked, scroll to it.
  const handleSectionClick = (section: string) => {
    const el = document.getElementById(getSectionId(section));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Page Title */}
        <h1 className="mb-6 text-center text-4xl font-bold text-white">
          Police Codes
        </h1>

        {/* Top Search Bar for police codes */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search police codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md rounded border border-gray-700 bg-gray-800 p-2 text-white placeholder-gray-400"
          />
        </div>

        {/* Wrap sidebar and main content */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Container */}
          <div className="mb-8 md:mb-0 md:w-1/4 md:pr-8">
            <aside className="sticky top-8">
              <h2 className="mb-4 text-2xl font-bold text-white">Sections</h2>
              <ul>
                {/* Search Button */}
                <li>
                  <button
                    onClick={scrollBackToTop}
                    className="mb-2 w-full rounded bg-green-600 px-3 py-2 text-left text-white transition-colors hover:bg-green-700"
                  >
                    Search
                  </button>
                </li>
                {sections.map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => handleSectionClick(section)}
                      className={`mb-2 w-full rounded px-3 py-2 text-left transition-colors ${
                        activeSections.includes(section)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {section}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {/* Main Content: Render sections in a 2-column grid */}
          <main className="grid grid-cols-1 gap-8 md:w-3/4 md:grid-cols-2">
            {(!codesData || sections.length === 0) && (
              <p className="col-span-full text-center text-gray-400">
                No codes found.
              </p>
            )}

            {codesData &&
              sections.map((section) => (
                <div
                  key={section}
                  id={getSectionId(section)}
                  className="mb-10 scroll-mt-20"
                >
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    {section}
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Code</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {codesData[section]?.map((codeItem, index) => (
                        <TableRow key={`${section}-${index}-${codeItem.CODE}`}>
                          <TableCell className="font-medium">
                            {codeItem.CODE}
                          </TableCell>
                          <TableCell>{codeItem.DESCRIPTION}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
          </main>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollBackToTop}
        className="fixed bottom-4 right-4 rounded bg-blue-600 px-4 py-2 text-white shadow-lg transition-colors hover:bg-blue-700"
      >
        Back to Top
      </button>
    </div>
  );
}
