import Title from "../components/Title";

export default function Home() {
  return (
    <div>
      <Title>Welcome to my website!</Title>
      <div className="relative flex h-0 w-full justify-center pb-[100%]">
        <iframe
          title="Cat welcoming"
          src="https://giphy.com/embed/f9RuFaYaZO9OZ3qLjZ"
          width="480"
          height="480"
          className="absolute"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        <a
          href="https://giphy.com/gifs/cat-moment-remember-8vQSQ3cNXuDGo"
          target="_blank"
          rel="noreferrer"
        >
          via GIPHY
        </a>
      </p>
    </div>
  );
}
