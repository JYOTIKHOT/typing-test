export function longestCommonSubstring(arr1) {
  // Create a sorted copy of the input array
  const arr = arr1.concat().sort();
  // Get the first and last strings after sorting
  const a1 = arr.at(0) || "";
  const a2 = arr.at(arr.length - 1);
  // Initialize an index variable
  let i = 0;

  // Iterate through the characters of the first string until a mismatch is found
  while (i < a1?.length && a1?.charAt(i) === a2?.charAt(i)) {
    i++;
  }

  // Return the longest common starting substring using substring(0, i)
  return a1?.substring(0, i);
}
