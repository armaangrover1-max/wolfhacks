export default function ShellCard({ children, className = "" }) {
  return (
    <section
      className={`card rounded-[2rem] p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}