import java.util.*;

public class shortestPath {

    public static void main(String[] args) {
        int[][] distanceMatrix = {
            {0, 5, 7, 0, 0, 0},
            {5, 0, 0, 15, 20, 0},
            {7, 0, 0, 5, 35, 0},
            {0, 15, 5, 0, 0, 20},
            {0, 20, 35, 0, 0, 10},
            {0, 0, 0, 20, 10, 0}
        };

        if (args.length != 2) {
            System.out.println("Usage: java ShortestPathWithQueue <source> <destination>");
            return;
        }
        
        int source = Integer.parseInt(args[0]);
        int destination = Integer.parseInt(args[1]);
        if (!isValidNode(source, distanceMatrix.length) || !isValidNode(destination, distanceMatrix.length)) {
            System.out.println("Invalid source or destination node.");
            return;
        }

        int shortestDistance = findShortestPath(distanceMatrix, source, destination);
        System.out.println(shortestDistance);
    }

    public static int findShortestPath(int[][] distanceMatrix, int source, int destination) {
        int numNodes = distanceMatrix.length;
        PriorityQueue<Node> pq = new PriorityQueue<>(numNodes, Comparator.comparingInt(node -> node.distance));
        int[] distance = new int[numNodes];
        Arrays.fill(distance, Integer.MAX_VALUE);

        pq.offer(new Node(source, 0));
        distance[source] = 0;

        while (!pq.isEmpty()) {
            Node current = pq.poll();

            if (current.node == destination) {
                return distance[destination];
            }

            for (int i = 0; i < numNodes; i++) {
                if (distanceMatrix[current.node][i] != 0 && distance[current.node] != Integer.MAX_VALUE && distance[current.node] + distanceMatrix[current.node][i] < distance[i]) {
                    distance[i] = distance[current.node] + distanceMatrix[current.node][i];
                    pq.offer(new Node(i, distance[i]));
                }
            }
        }
        return -1;
    }

    public static boolean isValidNode(int node, int numNodes) {
        return node >= 0 && node < numNodes;
    }

    static class Node {
        int node;
        int distance;

        Node(int node, int distance) {
            this.node = node;
            this.distance = distance;
        }
    }
}
