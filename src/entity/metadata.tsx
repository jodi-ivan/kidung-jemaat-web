class entry {
  public category: string;
  public sub_category: string;

  constructor(category: string, sub_category: string) {
    this.category = category;
    this.sub_category = sub_category;
  }
}

class songMeta {
  title: string;
  L1: string;
  L2: string;
  usage: entry[];


  constructor(title: string, L1: string, L2: string, usage: entry[] = []) {
    this.title = title;
    this.L1 = L1;
    this.L2 = L2;
    this.usage = usage;
  }
}

export default class Metadata {
  public total_verse: number;
  public all_variants: string[];
  public selected_variant: string;
  public loc: songMeta;

  constructor(total_verse: number, all_variant: string[]);

  constructor(total_verse: number, all_variant: string[] = [], selected_variant: string = "", loc: songMeta = new songMeta("", "", "")) {
    this.total_verse = total_verse;
    this.all_variants = all_variant;
    this.selected_variant = selected_variant;
    this.loc = loc;
  }
}
