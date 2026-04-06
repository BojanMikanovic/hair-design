interface HeadingProps {
   text: string;
}

export const Heading = ({ text }: HeadingProps) => (
   <cx>
      <h1>{text}</h1>
   </cx>
);
