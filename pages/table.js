import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
const Table = ({ state }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mx-auto my-5">
          <h1 className={"my-4"}>Hesap Kurdu Tablo</h1>
          {state.info ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Ad</th>
                  <th scope="col">Soyad</th>
                  <th scope="col">T.C</th>
                  <th scope="col">Ev Değeri</th>
                  <th scope="col">Kredi Tutarı</th>
                  <th scope="col">Vade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{state?.info?.ad}</td>
                  <td>{state?.info?.soyad}</td>
                  <td>{state?.info?.tc} </td>
                  <td>{state?.info?.eDegeri}</td>
                  <td>{state?.info?.kTutari}</td>
                  <td>{state?.info?.vade}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div> Lütfen öncelikle bilgilerinizi giriniz </div>
          )}
          <Link href="/">
            <a>Ana Sayfa</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    state,
  };
};
export default connect(mapStateToProps)(Table);
