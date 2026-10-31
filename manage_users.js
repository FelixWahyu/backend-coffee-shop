const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users in database:");
  console.log(users.map(u => ({ username: u.username, name: u.name, role: u.role })));
  
  const adminUsername = process.argv[2];
  if (adminUsername) {
    const updated = await prisma.user.update({
      where: { username: adminUsername },
      data: { role: "ADMIN" }
    });
    console.log(`Successfully updated ${adminUsername} to ADMIN:`, { 
      username: updated.username, 
      name: updated.name, 
      role: updated.role 
    });
  } else {
    console.log("\nTo make a user an admin, run:");
    console.log("node manage_users.js <username>");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
