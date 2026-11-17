export interface Span {
  start: number;
  end: number;
}

interface Title {
  snippet: string;
  spans: Span[];
}

interface AutocompleteItem {
  score: number;
  title: Title;
  hymnno: number;
  full_title: string;
  variant: string;
}

interface SearchItem extends AutocompleteItem {
  verse: Record<string, VerseData>;
}

interface VerseData {
  snippet: string;
  spans: Span[];
}


interface SearchData {
  autocomplete: AutocompleteItem[];
  search: SearchItem[];
}

export default class SearchResult {
  public data: SearchData;

  constructor(data: SearchData) {
    this.data = data;
  }
}
