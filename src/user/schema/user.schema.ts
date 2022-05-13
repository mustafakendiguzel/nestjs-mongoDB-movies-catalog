import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose";
import { UserRoles } from "src/user.roles";

export type UserDocument = User & Document
export type MovieDocument = Movies & Document

@Schema()
export class Movies {

  @Prop()
  movieId:string;

  @Prop()
  name: string;
  
  @Prop()
  title:string;

   
  @Prop()
  star:number;

  @Prop()
  description:string;

}
// Generate a Mongoose Schema before use as Subdocument
export const MoviesSchema = SchemaFactory.createForClass(Movies);



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

  @Prop({ types: [MoviesSchema] ,default:[]})
  favMovies: Movies[]

  @Prop({default:UserRoles.Admin })
  role:string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
