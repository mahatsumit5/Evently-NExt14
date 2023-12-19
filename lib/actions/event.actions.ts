"use server";
import { CreateEventParams, GetAllEventsParams } from "@/types";
import { connectToDatabase } from "../mongodb/database";
import { handleError } from "../utils";
import User from "../mongodb/database/models/user.model";
import Event from "../mongodb/database/models/event.model";
import Category from "../mongodb/database/models/category.model";

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "category",
      model: Category,
      select: "_id name",
    });
};
export async function createEvent({ event, userId, path }: CreateEventParams) {
  try {
    console.log(userId);
    await connectToDatabase();
    const organizer = await User.findById(userId);
    console.log(organizer);
    if (!organizer) throw new Error("organiser not found");
    const newEvent = await Event.create({
      ...event,
      imageUrl: "",
      category: event.categoryId,
      organizer: userId,
    });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();
    const event = await populateEvent(Event.findById(eventId));
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};
export const getAllEvents = async ({
  query,
  limit,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase();
    const conditions = {};
    const events = await populateEvent(
      Event.find().sort({ createdAt: "desc" }).skip(0).limit(limit)
    );
    const eventsCount = await Event.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPage: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};
