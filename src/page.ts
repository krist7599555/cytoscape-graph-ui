interface PageBase {
  path: string;
  message: string;
  position?: { x: number, y: number };
}
export interface TextPage extends PageBase {
  type: "text";
  timeout: number;
  redirect: string;
}
export interface ChoicePage extends PageBase {
  type: "choice";
  choice: { 
    message: string;
    redirect: string; 
  }[];
}

export type Page = TextPage | ChoicePage;
