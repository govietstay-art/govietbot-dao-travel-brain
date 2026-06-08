export const metadata = {
  title: "Ask Đào | GoVietStay",
  description: "GoVietStay Local Travel Assistant"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
