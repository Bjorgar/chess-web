declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;

  export default content;
}
