import { Wrapper } from "@googlemaps/react-wrapper";

export default function Map() {
  return (
    <Wrapper apiKey={"YOUR_API_KEY"}>
      <MyMapComponent />
    </Wrapper>
  );
}
