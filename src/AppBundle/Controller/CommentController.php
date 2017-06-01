<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;
use \BackendBundle\Entity\User;
use BackendBundle\Entity\Video;
use BackendBundle\Entity\Comment;

class CommentController extends Controller {

    public function newAction(Request $request) {

        $jwt_auth = $this->get("app.jwt_auth");
        $hash = $request->get('authorization', null);
        $check = $jwt_auth->checkToken($hash);

        if ($check == true) {
            $identity = $jwt_auth->checkToken($hash, true);

            $json = $request->request->get("json", null);

            if ($json != null) {
                $params = json_decode($json);
                $createdAt = new \DateTime('now');

                $user_id = (isset($identity->sub) ? $identity->sub : null);
                $video_id = (isset($params->video_id) ? $params->video_id : null);
                $body = (isset($params->body)) ? $params->body : null;

                if ($user_id != null && $video_id != null) {
                    $em = $this->getDoctrine()->getManager();
                    $user = $em->getRepository("BackendBundle:User")->findOneBy(
                            array(
                                "id" => $user_id
                    ));

                    $video = $em->getRepository("BackendBundle:Video")->findOneBy(
                            array(
                                "id" => $video_id
                    ));

                    $comment = new Comment();
                    $comment->setUser($user);
                    $comment->setCreatedAt($createdAt);
                    $comment->setVideo($video);
                    $comment->setBody($body);

                    $em->persist($comment);
                    $em->flush();

                    $data = array(
                        "status" => "succes",
                        "code" => 200,
                        "msg" => "Comment created success"
                    );
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => 400,
                        "msg" => "Comment not created"
                    );
                }
            } else {
                $data = array(
                    "status" => "error",
                    "code" => 400,
                    "msg" => "Comment not created, params failed"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "Authorization not valid"
            );
        }
        return $this->json($data);
    }

    public function deleteAction(Request $request, $id = null) {
        $jwt_auth = $this->get("app.jwt_auth");
        $hash = $request->get('authorization', null);
        $check = $jwt_auth->checkToken($hash);

        if ($check == true) {
            $identity = $jwt_auth->checkToken($hash, true);
            $user_id = ($identity->sub != null) ? $identity->sub : null;


            $em = $this->getDoctrine()->getManager();

            $comment = $em->getRepository("BackendBundle:Comment")->findOneBy(
                    array(
                        "id" => $id,
            ));

            if (is_object($comment) && $user_id != null) {
                if ($user_id == $comment->getUser()->getId() || $comment->getVideo()->getUser->getId() == $user_id) {
                    $em->remove($comment);
                    $em->flush();
                    $data = array(
                        "status" => "success",
                        "code" => 200,
                        "msg" => "Comment deleted"
                    );
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => 400,
                        "msg" => "Comment not deleted"
                    );
                }
            } else {
                $data = array(
                    "status" => "error",
                    "code" => 400,
                    "msg" => "Comment not deleted"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "Authorization not valid"
            );
        }
        return $this->json($data);
    }

    public function listAction(Request $request, $id = null) {
        $em = $this->getDoctrine()->getManager();

        $em = $this->getDoctrine()->getManager();
        $video = $em->getRepository("BackendBundle:Video")->findOneBy(
                array(
                    "id" => $id
        ));

        $comments = $em->getRepository("BackendBundle:Comment")->findBy(
                array(
            "video" => $video
                ), array('id' => 'desc'));

        if (count($comments) >= 1) {
            $data = array(
                "status" => "success",
                "code" => 200,
                "data" => $comments
            );
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "json" => "No commments for this video"
            );
        }

        return $this->json($data);
    }

}
