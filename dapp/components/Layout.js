import Head from "next/head";
import React, { useRef, useEffect, useState, useContext } from "react";

const Layout = ({ children }) => {

    return (
        <>
            <Head>
                <title>Namespaces - Digital Badging Platform</title>
                <meta name="description" content="" />
                <meta name="author" content="raldblox" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://namespaces.raldblox.com" />
                <meta property="og:title" content="" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="https://namespaces.raldblox.com/namespaces.png" />
                <meta property="og:image:alt" content="namespaces" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="@_namespaces" />
                <meta property="twitter:title" content="Badgify – a digital badging platform for everyone." />
                <meta property="twitter:description" content="" />
                <meta property="twitter:image" content="https://namespaces.raldblox.com/namespaces.png" />
                <link rel="apple-touch-icon" content="https://namespaces.raldblox.com/logo.png" />
            </Head>
            <div>
                {children}
            </div>
        </>
    );
};

export default Layout;
