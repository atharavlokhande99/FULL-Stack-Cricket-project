import java.util.HashMap;

public class main {
    public static int [] arr = (int[] nums, int  target){
         HashMap <Integer,Integer> map = new HashMap <> ();
    for(int i=0;i<nums.length;i++){
        int complement = target - nums[i];
        if(map containsKey(complement)){
            
        }
    }

    }

    H

    public int [] twoSum (int [] nums,int target) {
        
         HashMap <Integer,Integer>freq = new HashMap <> ();

        for(int i=0;i<nums.length;i++){
            int complement = target - nums[i];

            if(freq.containsKey(complement)){
                freq.put(complement,freq.get(complement)+1);
            }
            else{
                freq.put(nums[i],1);
            }



        
        }
        System.out.println(freq);
    }
}
