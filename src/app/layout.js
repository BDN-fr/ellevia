import '@/global.css'

import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
    title: "Ellevia",
    description: "A frontend website for using the ilevia internal API because the new app is trash",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}
