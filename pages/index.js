import Head from "next/head"
import stylesheet from 'styles/main.scss'
import 'isomorphic-unfetch'


import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"

import React, { useState, useEffect } from 'react';


function IndexPage ( cv ) {
    const [isArticleVisible, setIsArticleVisible] = useState(false);
    const [timeout, setTimeout] = useState(false);
    const [articleTimeout, setArticleTimeout] = useState(false);
    const [article, setArticle] = useState("");
    const [loading, setLoading] = useState("is-loading");
    let timeoutId = "";
    
    useEffect(() => {
        timeoutId = setTimeout(() => {
            setLoading("")
        }, 100);
        console.log(cv);
    }, []);

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
    }, [timeout]);

    function handleOpenArticle(article) {
        setIsArticleVisible(!isArticleVisible);
        setArticle(article);

        setTimeout(() => {
            setTimeout(!timeout);
        }, 325);

        setTimeout(() => {
            setArticleTimeout(!articleTimeout);
        }, 350);
    };

    function handleCloseArticle() {
        setArticleTimeout(!articleTimeout);

        setTimeout(() => {
            setTimeout(!timeout);
        }, 325);

        setTimeout(() => {
            setIsArticleVisible(!isArticleVisible);
            setArticle("");
        }, 350);
    };

    return (
            <div className={`body ${loading} ${isArticleVisible ? "is-article-visible" : ""}`}>
                <div>
                    <Head>
                        <title>Next.js Starter</title>
                        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600,600i" rel="stylesheet" />
                    </Head>

                    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

                    <div id="wrapper">
                        <Header 
                            picture={cv.profilePicture}
                            onOpenArticle={handleOpenArticle} 
                            timeout={timeout} />
                        <Main
                            isArticleVisible={isArticleVisible}
                            timeout={timeout}
                            articleTimeout={articleTimeout}
                            article={article}
                            onCloseArticle={handleCloseArticle}
                        />
                        <Footer timeout={timeout} />
                    </div>

                    <div id="bg" />
                </div>
            </div>
        )
    }


IndexPage.getInitialProps = async ({ req }) => {
    let cvData = await fetch('https://cv-resume-api.azurewebsites.net/api/v1/resume/cv')
    let profilePicture ='https://cv-resume-api.azurewebsites.net/api/v1/resume/cv/image/profile'
    let cv = await cvData.json()
    console.log(profilePicture);    
    return {
        cv: cv,
        profilePicture: profilePicture
    }
  }

export default IndexPage
