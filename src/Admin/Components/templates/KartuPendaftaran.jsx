import React from "react";
import { pdfjs } from "react-pdf";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Canvas,
  Font,
  Svg,
  Line,
  Image,
} from "@react-pdf/renderer";
import vectors from "../Images/2.png";
import { useState } from "react";
import { formatTanggal } from "../../../Helpers/ValHelpers";
import { useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "extrabold",
  },
  sub: {
    fontSize: 14,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
  },
  kode_daftar: {
    fontSize: 16,
    textAlign: "justify",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 10,
    textAlign: "justify",
    fontWeight: "extrabold",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: "black",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "table",
    width: "auto",
    // // borderStyle: "solid",
    // borderWidth: 0,
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "50%",
    // // borderStyle: "solid",
    // borderWidth: 1,
    // borderLeftWidth: 0,
    // borderTopWidth: 0
  },
  tableCol25: {
    width: "25%",
    // // borderStyle: "solid",
    // borderWidth: 1,
    // borderLeftWidth: 0,
    // borderTopWidth: 0
  },
  tableCol75: {
    width: "75%",
    // // borderStyle: "solid",
    // borderWidth: 1,
    // borderLeftWidth: 0,
    // borderTopWidth: 0
  },
  tableCell: {
    marginTop: 5,
    fontSize: 10,
  },
  image:{
    width:'100%'
  }
});

const KartuPendaftaran = (props) => {
    const URLS = process.env.REACT_APP_BASE_URL;
    const dataPendaftar = props.dataProps.dataPendaftar;
    const dataProps = props.dataProps;
    const dataSekolah = dataProps.dataSekolah;
    const pPp = dataPendaftar.pendaftar != null && dataPendaftar.pendaftar.foto != "-" ? URLS + dataPendaftar.pendaftar.foto: vectors;
    const[img,setImg] = useState(vectors)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          {dataSekolah.nama_sekolah.toUpperCase()}
        </Text>
        <Text style={styles.sub}>
          KARTU PENDAFTARAN PPDB ONLINE TAHUN AJARAN{" "}
          {dataSekolah.tahun_ajaran.tahun_ajaran.toUpperCase()}
        </Text>
        <Text style={styles.subtitle}>
          {dataSekolah.alamat_sekolah}, Hp:{dataSekolah.no_hp}
        </Text>
        <Svg height="5" width="100%">
          <Line
            x1="0"
            y1="5"
            x2="1080"
            y2="5"
            strokeWidth={2}
            stroke="rgb(0,0,0)"
          />
        </Svg>
        <Svg height={10} width="100%"></Svg>
        <Text style={styles.subtitle} fixed>
            BUKTI PENDAFTARAN PPDB ONLINE TAHUN AJARAN{" "}
          {dataSekolah.tahun_ajaran.tahun_ajaran.toUpperCase()}
        </Text>
        <Svg height={30} width="100%"></Svg>
        <Text style={styles.kode_daftar}>
          {dataPendaftar.data_lain.kode_pendaftaran}
        </Text>
        <Svg height={10} width="100%"></Svg>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol75}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol25}>
                    <Text style={styles.tableCell}>NISN</Text>
                  </View>
                  <View style={styles.tableCol75}>
                    <Text style={styles.tableCell}>
                      : {dataPendaftar.pendaftar.nisn}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol25}>
                    <Text style={styles.tableCell}>NIK</Text>
                  </View>
                  <View style={styles.tableCol75}>
                    <Text style={styles.tableCell}>
                      : {dataPendaftar.pendaftar.nik}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol25}>
                    <Text style={styles.tableCell}>Nama</Text>
                  </View>
                  <View style={styles.tableCol75}>
                    <Text style={styles.tableCell}>
                      : {dataPendaftar.pendaftar.nama}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol25}>
                    <Text style={styles.tableCell}>Tempat,Tanggal Lahir</Text>
                  </View>
                  <View style={styles.tableCol75}>
                    <Text style={styles.tableCell}>
                      : {dataPendaftar.pendaftar.tempat_lahir}, {formatTanggal(dataPendaftar.pendaftar.tanggal_lahir)}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol25}>
                    <Text style={styles.tableCell}>Alamat</Text>
                  </View>
                  <View style={styles.tableCol75}>
                    <Text style={styles.tableCell}>
                      : {dataPendaftar.pendaftar.alamat}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol25}>
                    <Text style={styles.tableCell}>No HP</Text>
                  </View>
                  <View style={styles.tableCol75}>
                    <Text style={styles.tableCell}>
                      : {dataPendaftar.pendaftar.no_hp}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol25}>
                    <Text style={styles.tableCell}>Email</Text>
                  </View>
                  <View style={styles.tableCol75}>
                    <Text style={styles.tableCell}>
                      : {dataPendaftar.pendaftar.email}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.tableCol25}>
                <Image src={img} style={styles.image}></Image>
            </View>
          </View>
        </View>
        <Svg height={40} width="100%"></Svg>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol75}>

            </View>
            <View style={styles.tableCol25}>
                <View style={styles.tableCell}>
                    <Text style={styles.subtitle}>............,.......................20.....</Text>
                    <Text style={styles.subtitle}>Pendaftar</Text>
                    <Svg height={50} width="100%"></Svg>
                    <Text style={styles.subtitle}>(.........................................)</Text>
                </View>
            </View>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
};

export default KartuPendaftaran;
