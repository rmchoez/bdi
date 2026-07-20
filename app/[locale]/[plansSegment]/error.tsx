"use client";

export default function PlansError({ reset }: { reset: () => void }) {
  return <div className="plans-error"><h2>We couldn’t load the plans.</h2><button onClick={reset}>Try again</button></div>;
}
