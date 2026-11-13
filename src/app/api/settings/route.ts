import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();

 if(!ownerId){
            return NextResponse.json(
                {message:"owner id is required"},
                {status:400}
            )
        }

        await connectDb()

        const setings = await Settings.findOneAndUpdate(
            {ownerId},
            {businessName, supportEmail, knowledge},
            {new:true,upsert:true}
        )

        // upaset true ka upadte krdo hai agr nhe hai toh create kardo


        return NextResponse.json(setings)
      


  } catch (error) {

    return NextResponse.json(
                {message:`Settings error:${error}`},
                {status:500}
            )
    
  }
};
