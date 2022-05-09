import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose";

export type  UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  userId:string;
  
  @Prop({ required:true})   // Name uniqie:true is not working as I mention.
  name:string;

  @Prop({ required: true})
  password:string;
  
  @Prop({ required: true ,unique:true})
  email:string;

  @Prop({default:"user"})
  role:string
}

export const UserSchema = SchemaFactory.createForClass(User);