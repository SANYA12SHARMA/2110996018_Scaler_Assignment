import java.util.Arrays;

public class shortestPath {
    public static void main(String[] args) {
        int[][] distArray = {
            {0, 5, 7, 0, 0, 0},
            {5, 0, 0, 15, 20, 0},
            {7, 0, 0, 5, 35, 0},
            {0, 15, 5, 0, 0, 20},
            {0, 20, 35, 0, 0, 10},
            {0, 0, 0, 20, 10, 0}
        };

        if (args.length != 2) {
            System.out.println("Usage: java ShortestPath <source> <destination>");
            return;
        }
        
        int source = Integer.parseInt(args[0]);
        int destination = Integer.parseInt(args[1]);
        if (source < 0 || source >= distArray.length || destination < 0 || destination >= distArray.length) {
            System.out.println("Invalid source or destination node.");
            return;
        }
        int ans = findShortestPath(distArray, source,destination);
        System.out.println(ans);
    }
    public static int findShortestPath(int[][] distArray, int source,int destination) {
        int noOfDestinations = distArray.length;
        boolean[] visited = new boolean[noOfDestinations];
        int[] distance = new int[noOfDestinations];
        Arrays.fill(distance, Integer.MAX_VALUE);

        distance[source] = 0;

        for (int currDest = 0; currDest < noOfDestinations - 1; currDest++) {
            int currSource = minDistance(distance, visited);
            visited[currSource] = true;

            for (int dest = 0; dest < noOfDestinations; dest++) {
                if (!visited[dest] && distArray[currSource][dest] != 0 && (distance[currSource] + distArray[currSource][dest] < distance[dest])) {
                    distance[dest] = distance[currSource] + distArray[currSource][dest];
                }
            }
        }
        return distance[destination] == Integer.MAX_VALUE ? -1 : distance[destination];
    }

    public static int minDistance(int[] distance, boolean[] visited) {
        int minDist = Integer.MAX_VALUE;
        int minNode = -1;
        for (int node = 0; node < distance.length; node++) {
            if (!visited[node] && distance[node] < minDist) {
                minDist = distance[node];
                minNode = node;
            }
        }
        return minNode;
    }
   
}
