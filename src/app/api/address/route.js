import connect from "@/config/dbConfig";
import authOptions from "@/helpers/nextAuthOptions";
import Address from "@/models/AddressModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'unauthorized access.', success: false }, { status: 401 });
        }
        const { firstName, lastName, email, phone, address, addressDetail, city, pincode, lanndmark } = await request.json();
        const addressExist = await Address.findOne({ userId: session?.user.id });
        if (addressExist) {
            addressExist.firstName = firstName;
            addressExist.lastName = lastName;
            addressExist.email = email;
            addressExist.phone = phone;
            addressExist.address = address;
            addressExist.addressDetail = addressDetail;
            addressExist.city = city;
            addressExist.pincode = pincode;
            addressExist.lanndmark = lanndmark;
            await addressExist.save();
        } else {
            await Address.create({ firstName, lastName, email, phone, address, addressDetail, city, pincode, lanndmark, userId: session?.user.id });
        }
        return NextResponse.json({ message: 'Address saved successfully.', success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'error while saving the address details.', success: false, error }, { status: 500 });
    }
}

export const GET = async () => {
    await connect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'unauthorized access.', success: false }, { status: 401 });
        }
        const address = await Address.findOne({ userId: session?.user.id });
        if (!address) {
            return NextResponse.json({ message: 'Address details not found.', success: false }, { status: 200 });
        }
        return NextResponse.json({ message: 'Address details fetched successfully.', success: true, address }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'error while fetching the address details.', success: false, error }, { status: 500 })
    }
}