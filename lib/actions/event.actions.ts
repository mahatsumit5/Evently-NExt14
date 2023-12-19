"use server";
import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  UpdateEventParams,
} from "@/types";
import { connectToDatabase } from "../mongodb/database";
import { handleError } from "../utils";
import User from "../mongodb/database/models/user.model";
import Event from "../mongodb/database/models/event.model";
import Category from "../mongodb/database/models/category.model";
import { revalidatePath } from "next/cache";

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
    await connectToDatabase();
    const organizer = await User.findById(userId);

    if (!organizer) throw new Error("organiser not found");
    const newEvent = await Event.create({
      ...event,
      imageUrl: "",
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);
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

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDatabase();
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export async function updateEvent({ event, userId, path }: UpdateEventParams) {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);

    if (!organizer) throw new Error("organiser not found");
    const newEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      {
        new: true,
      }
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}
