import Navbar from "../Navbar";
import View from "../View";
import BackgroundImage from "../BackgroundImage";
import Body from "../Body";

export default function Layout({children}:any) {
    return (
        <>
            <View props>
                <BackgroundImage>
                    <Navbar/>
                    <Body>
                        <main>{children}</main>
                    </Body>
                </BackgroundImage>
            </View>
        </>
    )
}


