import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../../../firebase";
import { ChatMessage, ChatRoom } from "../../core/chat/types";

const roomCollection = collection(db, "rooms");

export const retrieveRoomById = async (roomId: string) => {
	let room: ChatRoom;
	const roomRef = doc(roomCollection, roomId);
	const snapshot = await getDoc(roomRef);

	if (snapshot.exists()) {
		room = {
			id: snapshot.id,
			userId: snapshot.data()["userId"],
			kreatorId: snapshot.data()["kreatorId"],
			messages: snapshot.data()["messages"],
		};
		return room;
	}
};

export const retrieveRoomDetails = async (roomId: string) => {
	let room: ChatRoom;
	let details = {};
	const roomRef = doc(roomCollection, roomId);
	const snapshot = await getDoc(roomRef);

	if (snapshot.exists()) {
		room = {
			id: snapshot.id,
			userId: snapshot.data()["userId"],
			kreatorId: snapshot.data()["kreatorId"],
			messages: snapshot.data()["messages"],
		};
		return room;
	}

	return details;
};

export const retrieveRoom = async (userId: string, kreatorId: string) => {
	let room: ChatRoom[] = [];
	const roomQuery = query(
		roomCollection,
		where("userId", "==", userId),
		where("kreatorId", "==", kreatorId)
	);

	const roomSnapshot = await getDocs(roomQuery);

	roomSnapshot.forEach((roomDoc) => {
		room.push({
			id: roomDoc.id,
			userId: roomDoc.data()["userId"],
			kreatorId: roomDoc.data()["kreatorId"],
			messages: roomDoc.data()["messages"],
		});
	});

	return room;
};

export const retrieveChatRoomMessages = async (
	id: string,
	setMessages: Dispatch<SetStateAction<ChatMessage[]>>
) => {
	const roomDoc = collection(db, "rooms", id, "messages");
	onSnapshot(roomDoc, (doc) => {
		setMessages(
			doc.docs.map((messageDoc) => {
				return {
					id: messageDoc.id,
					message: messageDoc.data()["message"],
					userId: messageDoc.data()["userId"],
					timestamp: messageDoc.data()["timestamp"],
				};
			})
		);
	});
};
