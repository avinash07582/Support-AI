// import connectDb from "@/lib/db";
// import Settings from "@/model/settings.model";
// import { NextRequest, NextResponse } from "next/server";

// export const POST = async (req: NextRequest) => {
//   try {
//     const { ownerId, businessName, supportEmail, knowledge } = await req.json();

//  if(!ownerId){
//             return NextResponse.json(
//                 {message:"owner id is required"},
//                 {status:400}
//             )
//         }

//         await connectDb()

//         const setings = await Settings.findOneAndUpdate(
//             {ownerId},
//             {businessName, supportEmail, knowledge},
//             {new:true,upsert:true}
//         )

//         // upaset true ka upadte krdo hai agr nhe hai toh create kardo


//         return NextResponse.json(setings)
      


//   } catch (error) {

//     return NextResponse.json(
//                 {message:`Settings error:${error}`},
//                 {status:500}
//             )
    
//   }
// };



import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const {
            ownerId,
            businessName,
            supportEmail,
            knowledge,
            allowedDomains
        } = await req.json();

        if (!ownerId) {
            return NextResponse.json(
                { message: "Owner ID is required" },
                { status: 400 }
            );
        }

        await connectDb();

        const updateData: any = {
            businessName,
            supportEmail,
            knowledge
        };

        // Update domains only when provided
        if (allowedDomains !== undefined) {
            if (
                !Array.isArray(allowedDomains) ||
                !allowedDomains.every(domain => typeof domain === "string")
            ) {
                return NextResponse.json(
                    { message: "Invalid domains format" },
                    { status: 400 }
                );
            }

            const normalizedDomains = allowedDomains.map((domain: string) => {
                const url = new URL(domain);

                if (!["http:", "https:"].includes(url.protocol)) {
                    throw new Error("Only HTTP and HTTPS domains are allowed");
                }

                return url.origin;
            });

            updateData.allowedDomains = [...new Set(normalizedDomains)];
        }

        const settings = await Settings.findOneAndUpdate(
            { ownerId },
            { $set: updateData },
            { new: true, upsert: true, runValidators: true }
        );

        return NextResponse.json(settings);

    } catch (error) {
        console.error("Settings error:", error);

        return NextResponse.json(
            { message: "Settings update failed" },
            { status: 500 }
        );
    }
};
