import mongoose, { Document, Schema, Model } from "mongoose";

enum YangonTownShipEnum {
  Kamaryut = "Kamaryut",
  Kyauktada = "Kyauktada",
  Kyimyindine = "Kyimyindine",
  Sangyoung = "Sangyoung",
  Seikkan = "Seikkan",
  Dagon = "Dagon",
  Pabedann = "Pabedann",
  Bahann = "Bahann",
  Mayangonn = "Mayangonn",
  Latha = "Latha",
  Hline = "Hline",
  Lanmadaw = "Lanmadaw",
  Alone = "Alone",
  Kawhmu = "Kawhmu",
  Kyauktan = "Kyauktan",
  Kungyangonn = "Kungyangonn",
  Kayan = "Kayan",
  SeikkyiKhanaungto = "SeikkyiKhanaungto",
  Twantay = "Twantay",
  Dalla = "Dalla",
  Thongwa = "Thongwa",
  Tanyin = "Tanyin",
  Taikkyi = "Taikkyi",
  Htantabin = "Htantabin",
  Shwepyitha = "Shwepyitha",
  Hlinethaya = "Hlinethaya",
  Hlegu = "Hlegu",
  Insein = "Insein",
  Mingaladon = "Mingaladon",
  Hmawbi = "Hmawbi",
  Tarmwe = "Tarmwe",
  SouthOkkalapa = "SouthOkkalapa",
  DagonMyothitSouth = "DagonMyothitSouth",
  Dawbon = "Dawbon",
  Pazundaung = "Pazundaung",
  Botahtaung = "Botahtaung",
  Mingalataungnyunt = "Mingalataungnyunt",
  NorthOkkalapa = "NorthOkkalapa",
  Yankin = "Yankin",
  Tharkayta = "Tharkayta",
  Thingangyunn = "Thingangyunn",
  DagonMyothitNorth = "DagonMyothitNorth",
}

interface TownShip extends Document {
  townShip: String;
  isDeleted: Boolean;
  dealerId: mongoose.Schema.Types.ObjectId[];
}

const TownShipSchema: Schema<TownShip> = new Schema({
  townShip: {
    type: String,
    enum: Object.values(YangonTownShipEnum),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  dealerId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminusers",
    },
  ],
});

const TownShipModels: Model<TownShip> = mongoose.model(
  "TownShips",
  TownShipSchema
);

export { TownShipModels, TownShip };
