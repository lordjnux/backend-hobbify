SELECT "userId", "username", "name"
from users
LEFT JOIN users_hobbies_hobbies on "users_hobbies_hobbies"."usersUserId" = "users"."userId" 
JOIN hobbies on "hobbies"."hobbieId" = "users_hobbies_hobbies"."hobbiesHobbieId"
where "users_hobbies_hobbies"."hobbiesHobbieId" in (1)