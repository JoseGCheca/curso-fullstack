<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;
use \BackendBundle\Entity\User;
use BackendBundle\Entity\Video;

class VideoController extends Controller {

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
                $updatedAt = new \DateTime('now');
                $imagen = null;
                $video_path = null;
                $user_id = ($identity->sub != null ? $identity->sub : null);
                $title = (isset($params->title)) ? $params->title : null;
                $description = (isset($params->description)) ? $params->description : null;
                $status = (isset($params->status)) ? $params->status : null;

                if ($user_id != null && $title != null) {
                    $em = $this->getDoctrine()->getManager();
                    $user = $em->getRepository("BackendBundle:User")->findOneBy(
                            array(
                                "id" => $user_id
                    ));
                    $video = new Video();
                    $video->setUser($user);
                    $video->setCreatedAt($createdAt);
                    $video->setUpdatedAt($updatedAt);
                    $video->setTitle($title);
                    $video->getDescription($description);
                    $video->setStatus($status);
                    //$video->setImage($image);
                    $em->persist($video);
                    $em->flush();

                    $video = $em->getRepository("BackendBundle:Video")->findOneBy(
                            array(
                                "user" => $user,
                                "title" => $title,
                                "status" => $status,
                                "createdAt" => $createdAt
                    ));
                    $data = array(
                        "status" => "succes",
                        "code" => 200,
                        "data" => $video
                    );
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => 400,
                        "msg" => "Video not created"
                    );
                }
            } else {
                $data = array(
                    "status" => "error",
                    "code" => 400,
                    "msg" => "Video not created, params failed"
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

    public function editAction(Request $request, $id = null) {
        $jwt_auth = $this->get("app.jwt_auth");
        $hash = $request->get('authorization', null);
        $check = $jwt_auth->checkToken($hash);

        if ($check == true) {
            $identity = $jwt_auth->checkToken($hash, true);

            $json = $request->request->get("json", null);

            if ($json != null) {
                $params = json_decode($json);
                $video_id = $id;
                $createdAt = new \DateTime('now');
                $updatedAt = new \DateTime('now');
                $imagen = null;
                $video_path = null;
                $user_id = ($identity->sub != null ? $identity->sub : null);
                $title = (isset($params->title)) ? $params->title : null;
                $description = (isset($params->description)) ? $params->description : null;
                $status = (isset($params->status)) ? $params->status : null;

                if ($user_id != null && $title != null) {
                    $em = $this->getDoctrine()->getManager();

                    $video = $em->getRepository("BackendBundle:Video")->findOneBy(
                            array(
                                "id" => $video_id,
                    ));

                    if (isset($identity->sub) && $identity->sub == $video->getUser()->getId()) {


                        $video->setUpdatedAt($updatedAt);
                        $video->setTitle($title);
                        $video->getDescription($description);
                        $video->setStatus($status);
                        //$video->setImage($image);
                        $em->persist($video);
                        $em->flush();


                        $data = array(
                            "status" => "succes",
                            "code" => 200,
                            "msg" => "video updated success"
                        );
                    } else {
                         $data = array(
                            "status" => "succes",
                            "code" => 400,
                            "msg" => "video updated error, you not owner"
                        );
                    }
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => 400,
                        "msg" => "Video not updated"
                    );
                }
            } else {
                $data = array(
                    "status" => "error",
                    "code" => 400,
                    "msg" => "Video not updated, params failed"
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

    public function pruebasAction() {
        echo "Hola controlador video";
        die();
    }

}
