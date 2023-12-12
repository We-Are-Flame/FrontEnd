/** @format */
import { Image } from "expo-image";
import AuthMark from "../../assets/authmark.png";
export default function SchoolAuthMark({ width, height }) {
  return <Image style={{ width: width, height: height }} source={AuthMark} />;
}
