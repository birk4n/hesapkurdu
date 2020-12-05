import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { connect } from "react-redux";
import { allInfos } from "./../actions/index";
import { useRouter } from "next/router";
function Home(props) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [tc, setTc] = useState();
  const [eDegeri, setEDegeri] = useState();
  const [kTutari, setKTutari] = useState();
  const [vade, setVade] = useState(12);
  const router = useRouter();

  function check_tcno(a) {
    if (a.substr(0, 1) == 0 || a.length != 11) {
      return false;
    }
    var i = 9,
      md = "",
      mc = "",
      digit,
      mr = "";
    while ((digit = a.charAt(--i))) {
      i % 2 == 0 ? (md += digit) : (mc += digit);
    }
    if (
      (eval(md.split("").join("+")) * 7 - eval(mc.split("").join("+"))) % 10 !=
      parseInt(a.substr(9, 1), 10)
    ) {
      return false;
    }
    for (var c = 0; c <= 9; c++) {
      mr += a.charAt(c);
    }
    if (eval(mr.split("").join("+")) % 10 != parseInt(a.substr(10, 1), 10)) {
      return false;
    }
    return true;
  }
  const handleChange = (e) => {
    if (e.target.id === "ad" || e.target.id === "soyad") {
      if (!/^[a-zA-Z ıüğişöçÜĞİŞÇÖ]*$/g.test(e.target.value)) {
        document.getElementById(e.target.id).className =
          "form-control is-invalid";
        setTimeout(() => {
          document.getElementById(e.target.id).className = "form-control";
        }, 3000);
      } else {
        document.getElementById(e.target.id).className = "form-control";
        if (e.target.id === "ad") {
          setAd(e.target.value);
        } else {
          setSoyad(e.target.value);
        }
      }
    }
    if (e.target.id === "tc") {
      if (check_tcno(e.target.value)) {
        setTc(e.target.value);
        document.getElementById(e.target.id).className =
          "form-control is-valid";
        setTimeout(() => {
          document.getElementById(e.target.id).className = "form-control";
        }, 3000);
      } else if (e.target.value.length === 11 && !check_tcno(e.target.value)) {
        document.getElementById(e.target.id).className =
          " form-control is-invalid";
        setTimeout(() => {
          document.getElementById(e.target.id).className = "form-control";
        }, 3000);
      }
    }
    if (e.target.id === "eDegeri" || e.target.id === "kTutari") {
      if (e.target.value < 999 || e.target.value > 1000000) {
        document.getElementById(e.target.id).className =
          " form-control is-invalid";
        document.getElementById("yetmisbes").innerHTML =
          " Tutar 1000 TL ile 1.000.000 TL arasında olmalıdır";
      } else {
        document.getElementById(e.target.id).className = "form-control";
        if (e.target.id === "eDegeri") {
          setEDegeri(e.target.value);
        } else {
          setKTutari(e.target.value);
        }
      }
    }
    if (e.target.id === "vade") {
      setVade(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const yetmisBes = eDegeri * 0.75;
    if (kTutari > yetmisBes) {
      document.getElementById("kTutari").className = " form-control is-invalid";
      document.getElementById("yetmisbes").innerHTML =
        "Kredi Tutarı, ev değerinin %75'inden küçük olmalıdır.";
    } else {
      props.allInfos({ ad, soyad, tc, eDegeri, kTutari, vade });
      router.push({
        pathname: "table",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-5 p-4 card">
          <h1>Hesapkurdu Konut Kredisi Hesaplama</h1>

          <form onSubmit={(e) => handleSubmit(e)} className="">
            <div className="row py-4">
              <div className="col-sm col-12">
                <label htmlFor="ad">
                  Ad <span className="text-danger">*</span>
                </label>
                <input
                  name="ad"
                  type="text"
                  className="form-control "
                  placeholder="Adınız"
                  id="ad"
                  onChange={(e) => handleChange(e)}
                  required
                  maxLength="10"
                  minLength="2"
                />
                <div className={"text-danger invalid-feedback"}>
                  Bu alana sadece harf girilmelidir.
                </div>
              </div>
              <div className="col-sm col-12">
                <label htmlFor="soyad">
                  Soyad<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Soyadınız"
                  id="soyad"
                  onChange={(e) => handleChange(e)}
                  required
                  maxLength="10"
                  minLength="2"
                />
                <div className={"text-danger invalid-feedback"}>
                  Bu alana sadece harf girilmelidir.
                </div>
              </div>
              <div className="col-sm col-12">
                <label htmlFor="tc">
                  T.C Kimlik No<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="T.C Kimlik numarnız"
                  id="tc"
                  onChange={(e) => handleChange(e)}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 11);
                  }}
                  required
                />
                <div className={"text-danger invalid-feedback"}>
                  Geçerli bir T.C no girmelisiniz.
                </div>
              </div>
            </div>

            <div className="row my-2">
              <div className="col-sm col-12">
                <label htmlFor="eDegeri">
                  Ev değeri<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="1000 ve 1.000.000 arasında olmalıdır"
                    id="eDegeri"
                    onChange={(e) => handleChange(e)}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 7);
                    }}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">TL</div>
                  </div>
                  <div className={"text-danger invalid-feedback"}>
                    Tutar 1000 TL ile 1.000.000 TL arasında olmalıdır
                  </div>
                </div>
              </div>
              <div className="col-sm col-12">
                <label htmlFor="kTutari">
                  Kredi Tutarı<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="1000 ve 1.000.000 arasında olmalıdır"
                    id="kTutari"
                    onChange={(e) => handleChange(e)}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 7);
                    }}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">TL</div>
                  </div>
                  <div
                    id="yetmisbes"
                    className={"text-danger invalid-feedback"}
                  >
                    Tutar 1000 TL ile 1.000.000 TL arasında olmalıdır
                  </div>
                </div>
              </div>
              <div className="col-sm col-12">
                <label htmlFor="vade">
                  Vade<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-2">
                  <select
                    id="vade"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    required
                  >
                    <option defaultValue value={"12"}>
                      12
                    </option>
                    <option value={"18"}>18</option>
                    <option value={"24"}>24</option>
                    <option value={"36"}>36</option>
                    <option value={"48"}>48</option>
                    <option value={"60"}>60</option>
                    <option value={"72"}>72</option>
                    <option value={"90"}>90</option>
                    <option value={"108"}>108</option>
                    <option value={"120"}>120</option>
                  </select>
                  <div className="input-group-append">
                    <div className="input-group-text">Ay</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="alert alert-warning" role="alert">
              * Yıldızlı tüm alanlar girilmelidir. <br />
              * Adınız ve Soyadınız maksimum 10 karakter minimum 2 karakterden
              oluşmalıdır. <br />
              * T.C Kimlik nonuz sadece rakamlardan ve 11 karakterden
              oluşmalıdır.
              <br />
              * Evinizin değeri ve istenilen kredi tutarı minimum 1000 TL
              maksimum 1,000,000 TL arasında olmalıdır. <br />* Kredi tutarı, ev
              değerinin %75’inden küçük olmalıdır.
            </div>
            <button type="submit" className="btn btn-outline-info mx-auto">
              Devam et
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    state,
  };
};
export default connect(mapStateToProps, { allInfos })(Home);
