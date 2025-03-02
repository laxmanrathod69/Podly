export const PlayCircle = ({ w, h }: { w: string; h: string }) => {
  return (
    <svg
      fill="none"
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
    >
      <path d="M32 4a28 28 0 1 0 28 28A28 28 0 0 0 32 4z" fill="#F97535" />
      <path
        d="M42.55 34.69l-13.1 8.66A3.51 3.51 0 0 1 24 40.42V23.58a3.51 3.51 0 0 1 5.45-2.93l13.11 8.66a3.23 3.23 0 0 1-.01 5.38z"
        fill="#FFFFFF"
      />
    </svg>
  )
}
