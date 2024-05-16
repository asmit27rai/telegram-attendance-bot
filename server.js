import { Telegraf } from "telegraf";

import { message } from "telegraf/filters";

import userModel from "./src/models/User.js";

import eventModel from "./src/models/Events.js";

import connectDb from "./src/config/db.js";

const bot = new Telegraf(process.env.TELE_BOT);

try {
  connectDb();
  console.log("DatabaseConnected");
} catch (err) {
  console.log(err);
  process.kill(process.pid, "SIGTERM");
}

bot.start(async (ctx) => {
  const from = ctx.update.message.from;
  console.log("from", from);

  try {
    await userModel.findOneAndUpdate(
      { tgId: from.id },
      {
        $setOnInsert: {
          firstName: from.first_name,
          lastName: from.last_name,
          isBot: from.is_bot,
          username: from.username,
        },
      },
      { upsert: true, new: true }
    );

    await eventModel.findOneAndUpdate(
      { tgId: from.id },
      {
        $setOnInsert: {
          FunElec: 0,
          MecMat: 0,
          FluidMec: 0,
          ManuTech: 0,
          MatMech: 0,
          TFunElec: 0,
          TMecMat: 0,
          TFluidMec: 0,
          TManuTech: 0,
          TMatMech: 0,
        },
      },
      { upsert: true, new: true }
    );

    await ctx.reply(
      `Hey! ${from.first_name}. Welcome.I am here to help you out in storing data of your attendance and give you info about your data.`
    );
  } catch (err) {
    console.log(err);
    await ctx.reply(
      "Facing Some Issue Our Team Is Working On It.....Sorry, For Delay."
    );
  }
});

bot.command("YFunElec", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        FunElec: 1,
        TFunElec: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("NFunElec", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        TFunElec: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("YMecMat", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        MecMat: 1,
        TMecMat: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("NMecMat", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        TMecMat: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("YFluidMec", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        FluidMec: 1,
        TFluidMec: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("NFluidMec", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        TFluidMec: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("YManuTech", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        ManuTech: 1,
        TManuTech: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("NManuTech", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        TManuTech: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("YMatMech", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        MatMech: 1,
        TMatMech: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("NMatMech", async (ctx) => {
  const from = ctx.update.message.from;
  try {
    await eventModel.updateOne({
      $inc: {
        TMatMech: 1,
      },
    });
    await ctx.reply("Attendance Is Updated.....");
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.command("res", async (ctx) => {
  const from = ctx.update.message.from;
  const query = { tgId: from.id };
  try {
    const eventt = await eventModel.findOne(query).exec();
    const evDa = eventt.toObject();
    let AFE = (evDa.FunElec/evDa.TFunElec)*100;
    let AMT = (evDa.ManuTech/evDa.TManuTech)*100;
    let AMMa = (evDa.MecMat/evDa.TMecMat)*100;
    let AMaM = (evDa.MatMech/evDa.TMatMech)*100;
    let AFm = (evDa.FluidMec/evDa.TFluidMec)*100;
    await ctx.reply(`Attendance Of EO-101 : ${AFE}`);
    await ctx.reply(`Attendance Of ME-251 : ${AMT}`);
    await ctx.reply(`Attendance Of ME-214 : ${AMMa}`);
    await ctx.reply(`Attendance Of ME-252 : ${AMaM}`);
    await ctx.reply(`Attendance Of ME-231 : ${AFm}`);
  } catch (err) {
    console.log(err);
    await ctx.reply("Please Try Again...");
  }
});

bot.on(message("text"), async (ctx) => {
  ctx.reply(
    "Please Use Proper Commands To Update Your Attendance Or To Know Proper Attendance States"
  );
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
