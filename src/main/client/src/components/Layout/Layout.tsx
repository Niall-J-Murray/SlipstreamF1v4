import Navbar from "../Navbar";
import View from "../View";
import BackgroundImage from "../BackgroundImage";
import Body from "../Body";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <View props>
        <BackgroundImage>
          <Navbar />
          <Body>
            <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pt-4 pb-8">
              {children}
            </main>
          </Body>
        </BackgroundImage>
      </View>
    </div>
  );
}
