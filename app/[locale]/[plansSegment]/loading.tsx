export default function PlansLoading() {
  return <div className="plans-skeleton" aria-label="Loading plans">{Array.from({ length: 8 }, (_, index) => <span key={index} />)}</div>;
}
