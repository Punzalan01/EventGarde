export function BackgroundGradientDark() {
  return (
    <div className="fixed inset-0 -z-10 bg-neutral-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,#38bdf8,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#38bdf820_1px,transparent_1px),linear-gradient(to_bottom,#38bdf820_1px,transparent_1px)] bg-[size:18px_18px]" />
    </div>
  );
}

export function BackgroundGradientLight() {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(#f472b6_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(circle_at_50%_50%,#000_75%,transparent_100%)] [-webkit-mask-image:radial-gradient(circle_at_50%_50%,#000_75%,transparent_100%)] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]" />
    </div>
  );
}

export function BackgroundGradientPurple() {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      <div
        className="absolute inset-0"
        style={{
          background: '#ffffff',
          backgroundImage: `radial-gradient(circle at top left, rgba(173, 109, 244, 0.5), transparent 70%)`,
          filter: 'blur(80px)',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}
