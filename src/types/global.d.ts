// Global static asset declarations
declare module '*.png' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  declare module '*.gif' {
    const content: string;
    export default content;
  }
  
  declare module '*.csv' {
    const content: string;
    export default content;
  }
  
  declare module '*.pdf' {
    const content: string;
    export default content;
  }
  
  // Optional: for importing Tailwind CSS module classNames (if using CSS modules)
  declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  // Optional: general utility types
  type Nullable<T> = T | null;
  type Maybe<T> = T | null | undefined;