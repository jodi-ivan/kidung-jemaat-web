export default class Metadata {
  public total_verse: number;
  public all_variants: string[];
  public selected_variant:string;

  constructor(total_verse: number, all_variant: string[], selected_variant="") {
    this.total_verse = total_verse;
    this.all_variants = all_variant;
    this.selected_variant = selected_variant;
  }
}
