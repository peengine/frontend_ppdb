import React from "react";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import vector from "./Images/alur.png";
const Hero = (props) => {
  const URLS = process.env.REACT_APP_BASE_URL;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
  return (
    <>
      {props.posts.length <= 0 && (
        <section id="home">
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="text">
                    <h3>
                      {" "}
                      <b>PPDB {props.sekolahName}</b>
                    </h3>
                    <p>
                      {" "}
                      Untuk calon pendaftar tahun ajaran{" "}
                      <b>{props.tahunAjaran}</b> bisa mendaftar melalui website
                      ini atau langsung datang ke tempat pendaftaran
                    </p>
                    <Link
                      to={"/dashboard"}
                      type="button"
                      className="btn btn-primary shadow"
                    >
                      Daftar Sekarang
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="image">
                    <img src="assets/hero-img.svg" className="home-img"></img>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </section>
      )}
      {props.posts && (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="bg-white"
          id="home"
           fade touch
        >
            {
                props.posts && props.posts.map((result) => {
                    return(
                    <Carousel.Item key={result.id} interval={3000}>
                        <Link to={"/post/"+result.slug_post}>
                            <img src={URLS+result.foto_post} className="d-block w-100" />
                        </Link>
                      </Carousel.Item>
                    )
                })
            }
        </Carousel>
      )}
    </>
  );
};

export default Hero;
