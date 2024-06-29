import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

const API_BASE_URL = "https://hn.algolia.com/api/v1/search";

const HackerNews = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [tag, setTag] = useState("story");
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}?query=${query}&tags=${encodeURIComponent(tag)}&page=${page}`);
        const data = await response.json();
        setResults(data.hits || []);
        setTotalPages(data.nbPages || 0);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, tag, page]);

  const handlePreviousPage = () => setPage((prev) => Math.max(0, prev - 1));
  const handleNextPage = () => setPage((prev) => Math.min(totalPages - 1, prev + 1));

  const handleQuery = (e) => {
    setQuery(e.target.value);
    setPage(0);
  };

  const handleTag = (e) => {
    setTag(e.target.value);
    setPage(0);
  };

  return (
    <div className="w-full max-w-[600px] flex flex-col gap-8">
      <h1 className="w-full text-center text-3xl font-display font-bold text-secondary-50">
        Hacker<span className="text-b-rose">News</span>
      </h1>
      <SearchBar query={query} onSetQuery={handleQuery} tag={tag} onSetTag={handleTag} />
      <Pagination page={page} totalPages={totalPages} onPrevious={handlePreviousPage} onNext={handleNextPage} />
      <ResultsList results={results} isLoading={isLoading} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

const SearchBar = ({ query, onSetQuery, tag, onSetTag }) => (
  <div className="w-full flex items-center gap-2">
    <Input placeholder="Search hacker news..." value={query} onChange={onSetQuery} />
    <div className="relative">
      <Select value={tag} onChange={onSetTag} />
      <ChevronDownIcon className="size-5 absolute right-2 top-[50%] translate-y-[-50%] fill-b-yellow" />
    </div>
  </div>
);

const Pagination = ({ page, totalPages, onPrevious, onNext }) => (
  <div className="w-full flex items-center justify-between gap-6">
    <h3 className="text-base text-secondary-100">
      {totalPages <= 0 ? "No results found!" : `Page ${page + 1} of ${totalPages}`}
    </h3>
    <div className="flex items-center gap-4">
      <Button disabled={page === 0} onClick={onPrevious}>
        Previous
      </Button>
      <Button disabled={page === totalPages - 1} onClick={onNext}>
        Next
      </Button>
    </div>
  </div>
);

const ResultsList = ({ results, isLoading }) => (
  <div className="w-full flex justify-center items-center">
    <ul className="w-full relative">
      {isLoading && <LoadingOverlay />}
      {results.map(({ url, objectID, title }, index) => (
        <ResultItem key={objectID || index} url={url} objectID={objectID} title={title} />
      ))}
    </ul>
  </div>
);

const ResultItem = ({ url, objectID, title }) => {
  const href = url || `https://news.ycombinator.com/item?id=${objectID}`;
  return (
    <li className="w-full py-3 border-b border-primary-600 last:border-b-0 text-b-yellow">
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {title}
      </a>
    </li>
  );
};

const LoadingOverlay = () => (
  <div className="w-full h-full absolute top-0 left-0 bg-primary-900 bg-opacity-60 flex items-center justify-center"></div>
);

const ErrorMessage = ({ message }) => <p className="text-b-red">{message}</p>;

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onSetQuery: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
  onSetTag: PropTypes.func.isRequired,
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

ResultItem.propTypes = {
  url: PropTypes.string,
  objectID: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default HackerNews;
