import { Inter ,Space_Grotesk} from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import Navbar from "../Components/Navbar";
const inter = Inter({ subsets: ["latin"] }); 
const psaceGrotesl= Space_Grotesk({
  subsets:['latin'],weight:["300","400","500","600","700"]
})

export const metadata = {
  title: "Price Watcher",
  description: "Find the right time to buy!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="max-w-10xl mx-auto">
          <Navbar/> 
          {children}
      </main> 
      </body> 
    </html>
  );
}
