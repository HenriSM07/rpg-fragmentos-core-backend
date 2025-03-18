import { Schema, Document, model } from 'mongoose';

export interface CharacterDocument extends Document {
  userId: string;
  name: string;
  age: number;
  description: string;
  attributes: {
    strength: number;
    vigor: number;
    agility: number;
    presence: number;
    intellect: number;
  };
  skills: {
    acrobatics?: number;
    animalHandling?: number;
    arts?: number;
    athletics?: number;
    currentEvents?: number;
    sciences?: number;
    crime?: number;
    diplomacy?: number;
    deception?: number;
    fortitude?: number;
    stealth?: number;
    initiative?: number;
    intimidation?: number;
    insight?: number;
    investigation?: number;
    combat?: number;
    medicine?: number;
    occultism?: number;
    perception?: number;
    piloting?: number;
    sailing?: number;
    profession?: number;
    reflexes?: number;
    religion?: number;
    survival?: number;
    tactics?: number;
    technology?: number;
    willpower?: number;
  };
}

export const characterSchema = new Schema<CharacterDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    description: { type: String, required: true },
    attributes: {
      strength: { type: Number, required: true },
      vigor: { type: Number, required: true },
      agility: { type: Number, required: true },
      presence: { type: Number, required: true },
      intellect: { type: Number, required: true },
    },
    skills: {
      acrobatics: { type: Number, default: 0 },
      animalHandling: { type: Number, default: 0 },
      arts: { type: Number, default: 0 },
      athletics: { type: Number, default: 0 },
      currentEvents: { type: Number, default: 0 },
      sciences: { type: Number, default: 0 },
      crime: { type: Number, default: 0 },
      diplomacy: { type: Number, default: 0 },
      deception: { type: Number, default: 0 },
      fortitude: { type: Number, default: 0 },
      stealth: { type: Number, default: 0 },
      initiative: { type: Number, default: 0 },
      intimidation: { type: Number, default: 0 },
      insight: { type: Number, default: 0 },
      investigation: { type: Number, default: 0 },
      combat: { type: Number, default: 0 },
      medicine: { type: Number, default: 0 },
      occultism: { type: Number, default: 0 },
      perception: { type: Number, default: 0 },
      piloting: { type: Number, default: 0 },
      sailing: { type: Number, default: 0 },
      profession: { type: Number, default: 0 },
      reflexes: { type: Number, default: 0 },
      religion: { type: Number, default: 0 },
      survival: { type: Number, default: 0 },
      tactics: { type: Number, default: 0 },
      technology: { type: Number, default: 0 },
      willpower: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const CharacterModel = model<CharacterDocument>('Character', characterSchema);